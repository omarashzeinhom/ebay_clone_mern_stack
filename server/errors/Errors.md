- ToDos

1. Fix the signup issue of first name duplication

```bash
MongoServerError: E11000 duplicate key error collection: eb_clone.users index: firstName_1 dup key: { firstName: "Maria" }
    at InsertOneOperation.execute (D:\Código de estudio 
visual\javascript\MERN\mern\server\node_modules\mongoose\node_modules\mongodb\lib\operations\insert.js:48:19)   
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)   
    at async executeOperationAsync (D:\Código de estudio visual\javascript\MERN\mern\server\node_modules\mongoose\node_modules\mongodb\lib\operations\execute_operation.js:106:16) {
  index: 0,
  code: 11000,
  keyPattern: { firstName: 1 },
  keyValue: { firstName: 'Maria' },
  [Symbol(errorLabels)]: Set(0) {}
}
```