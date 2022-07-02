import StatusCodes from 'http-status-codes';
import { Router, Request, Response } from 'express';
import os from 'os';
const multer = require('multer');
const path = require('path');
const sql = require('mssql');


// Chat router
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
    fetch: '/fetch',
    excel: '/excel' ,
} as const;



/**
 * Connect to socket room.
 */
router.get(p.fetch, async (req: Request, res: Response) => {
    // config for your database
    var config = {
      server: 'localhost',
      user: 'sa',
      password: '1618033988',
      database: 'prjACCI',
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }

    try {
      // make sure that any items are correctly URL encoded in the connection string
      await sql.connect(config)
      const result = await sql.query`SELECT * FROM [prjACCI].[Project].[Call]`
      // console.dir(result)
      res.json(result.recordset)
     } catch (err) {
      // ... error checks
     }
});

const upload = multer({ dest: os.tmpdir() })

/**
 * Connect to socket room.
 */
router.post(p.excel, upload.single('SampleFile') , async (req: any, res: Response) => {
  
  const title = req.body.title;
  const file = req.file;
  console.log(req)
  console.log(file)

    try {
      console.log(req)
      console.log(req)
      console.log(req)
      res.json({
        test: 'test'
      })
     } catch (err) {
      // ... error checks
     }
});




// Export router
export default router;
