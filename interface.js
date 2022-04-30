"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.User = void 0
const typebox_1 = require("@sinclair/typebox")
exports.User = typebox_1.Type.Object({
  name: typebox_1.Type.String(),
  mail: typebox_1.Type.Optional(typebox_1.Type.String({ format: "email" })),
})
