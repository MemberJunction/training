# Navigate to the script's directory
cd $PSScriptRoot

# CustomServerEntities
Write-Output "Switching to the 'GeneratedEntities' directory..."
cd .\GeneratedEntities\
Write-Output "Installing dependencies for 'GeneratedEntities'..."
npm install
Write-Output "Building 'GeneratedEntities'..."
npm run build

# Return to the root directory
cd ..

# CustomServerEntities
Write-Output "Switching to the 'CustomServerEntities' directory..."
cd .\CustomServerEntities\
Write-Output "Linking 'GeneratedEntities' in 'CustomServerEntities'..."
npm link "..\GeneratedEntities"
Write-Output "Installing dependencies for 'CustomServerEntities'..."
npm install
Write-Output "Building 'CustomServerEntities'..."
npm run build

# Return to the root directory
cd ..

# MJAPI
Write-Output "Switching to the 'MJAPI' directory..."
cd .\MJAPI\
Write-Output "Linking 'CustomServerEntities' in 'MJAPI'..."
npm link "..\CustomServerEntities"
Write-Output "Installing dependencies for 'MJAPI'..."
npm install
Write-Output "Building 'MJAPI'..."
npm run build

# Return to the root directory
cd ..

# Portal
Write-Output "Switching to the 'abstracts/Portal' directory..."
cd .\abstracts\Portal\
Write-Output "Linking 'GeneratedActions' and 'GeneratedEntities' in 'Portal'..."
npm link "..\..\GeneratedActions" "..\..\GeneratedEntities"
Write-Output "Installing dependencies for 'Portal'..."
npm install
Write-Output "Building 'Portal'..."
npm run build

# Back to the root directory
cd ../..
Write-Output "All steps completed successfully!"