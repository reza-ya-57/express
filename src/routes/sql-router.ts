import StatusCodes from 'http-status-codes';
import { Router, Request, Response } from 'express';
import os from 'os';
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
import fs from 'fs';
import xlsx from 'xlsx';
const path = require('path');
const sql = require('mssql');


// Chat router
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  fetch: '/fetch',
  excel: '/excel',
} as const;



/**
 * Connect to socket room.
 */
router.get(p.fetch, async (req: Request, res: Response) => {
  // config for your database
  var config = {
    server: '192.168.5.221',
    user: 'sa',
    password: 'reza@1618033988',
    database: 'SI_Dashboard',
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
    // const Criterias: any = await sql.query`SELECT * FROM [SI_Dashboard].[Report].[Criteria]`
    // let CriteriaIds = Criterias.recordset.map((crt: any) => parseInt(crt.Id))
    // const Demographics: any = await sql.query`SELECT * FROM [SI_Dashboard].[Base].[Demographic]`
    // let DemographicIds = Demographics.recordset.map((demo: any) => parseInt(demo.Id))
    // console.log(DemographicIds)
    // DemographicIds = DemographicIds.splice(1 ,)
    // console.log(CriteriaIds)
    // DemographicIds.forEach(async (demoId: any) => {
    //   CriteriaIds.forEach(async (crtId: any) => {
    //     await sql.query`INSERT INTO [SI_Dashboard].[Report].[DemographicCriteria]
    //                                 ([TimeId]
    //                                 ,[CompanyId]
    //                                 ,[DemographicId]
    //                                 ,[CriteriaId]
    //                                 ,[SatisfactionScore])
    //                           VALUES
    //                                 (3
    //                                 ,1
    //                                 ,${demoId}
    //                                 ,${crtId}
    //                                 ,${Math.floor(Math.random() * 10000 )})`
    //   })
    // })
    // console.log(CriteriaIds)
    const result = await sql.query`SELECT * FROM [SI_Dashboard].[Report].[DemographicCriteria]`

    console.log(result.recordset)
    res.json(result.recordset)
  } catch (err) {
    // ... error checks
  }
});



/**
 * Connect to socket room.
 */
router.post(p.excel, upload.single('SampleFile'), async (req: any, res: Response) => {
  const file = req.file;
  var workbook = xlsx.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
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
