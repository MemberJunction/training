"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const codegen_lib_1 = require("@memberjunction/codegen-lib");
(0, codegen_lib_1.initializeConfig)(process.cwd());
const skipDb = process.argv.includes('-skipdb');
(0, codegen_lib_1.runMemberJunctionCodeGeneration)(skipDb);
//# sourceMappingURL=index.js.map