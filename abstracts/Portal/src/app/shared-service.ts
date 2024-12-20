import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedData } from './shared-data';
import { AuthService } from '@auth0/auth0-angular';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // we want this to be a singleton, so we can use it to share data between components
  private static _instance: SharedService | null = null;

  private setupCompleteSource = new BehaviorSubject<boolean>(false);
  setupComplete$ = this.setupCompleteSource.asObservable();

  private _loggedIn: boolean = false;
  constructor(public auth: AuthService, private notificationService: NotificationService, private sharedData: SharedData) { 
    if (SharedService._instance)
      return SharedService._instance;
    else {
      this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
        this._loggedIn = isAuthenticated;
      });
      SharedService._instance = this; // set the instance since we're the first instance of this class being instantiated
    }    
  }

  async doSetup() {
    await this.sharedData.Refresh();

    this.setupCompleteSource.next(true);
  }

  public get LoggedIn(): boolean {
    return this._loggedIn; // gets updated by the subscription to auth.isAuthenticated$ in the constructor
  }

  private _accessDenied: boolean = false;
  public get AccessDenied(): boolean {
    return this._accessDenied;
  }
  public set AccessDenied(value: boolean) {
    this._accessDenied = value;
  }

  public static get Instance(): SharedService {
    if (SharedService._instance)
      return SharedService._instance;
    else
      throw new Error('SharedService.Instance is null');
  }

  private static _cache: DatacacheItem[] = [];
  public static get Cache(): DatacacheItem[] {
    return SharedService._cache;
  }
  public static SetCacheItem(key: string, value: any) {
    if (SharedService._cache) {
      const item = SharedService._cache.find(i => i.key === key);
      if (item)
        item.value = value;
      else {
        const newItem = new DatacacheItem();
        newItem.key = key;
        newItem.value = value;
        SharedService._cache.push(newItem);
      }
    }
  }
  
  public static GetCacheItem(key: string): any {
    if (SharedService._cache) {
      const item = SharedService._cache.find(i => i.key === key);
      if (item)
        return item.value;
    }
  }

  public DisplayNotification(message: string, style: "error" | "none" | "success" | "warning" | "info" | undefined) {
    this.notificationService.show({
      content: message,
      hideAfter: 600,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 400 },
      type: { style: style, icon: true },
    });
  }

  public get ColHeaderStyle(): any {
    return { 'font-weight' : 'bold', 'background-color': '#28533F' };
  }

  public static async calculateIndexedDBSize(dbName: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      let totalSize = 0;
  
      const request: IDBOpenDBRequest = indexedDB.open(dbName);
  
      request.onerror = function(event: Event) {
        reject(new Error("Couldn't open database"));
      };
  
      request.onsuccess = function(event: Event) {
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
  
        const transaction: IDBTransaction = db.transaction(Array.from(db.objectStoreNames), "readonly");
  
        transaction.oncomplete = function() {
          resolve(totalSize);
        };
  
        transaction.onerror = function(event: Event) {
          reject(new Error("Transaction failed"));
        };
  
        Array.from(db.objectStoreNames).forEach((storeName: string) => {
          const store: IDBObjectStore = transaction.objectStore(storeName);
          const cursorRequest: IDBRequest<IDBCursorWithValue | null> = store.openCursor();
  
          if (cursorRequest === null) 
            return;

          cursorRequest.onsuccess = function(event: Event) {
            const cursor: IDBCursorWithValue | null = (event.target as IDBRequest<IDBCursorWithValue>).result;
  
            if (cursor) {
              const storedObject: any = cursor.value;
              const size: number = JSON.stringify(storedObject).length;
              totalSize += size;
              cursor.continue();
            }
          };
        });
      };
    });
  }
}

export class DatacacheItem {
  key: string = '';
  value: any = null;
}

