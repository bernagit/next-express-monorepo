import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodObject, ZodRawShape } from 'zod'

export const validate =
  (schema: ZodObject<ZodRawShape>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      next()
    } catch (err: ZodError | unknown) {
      if (!(err instanceof ZodError)) {
        console.error(err)
        res.status(400).json({
          success: false,
          errors: err,
        })
      } else {
        res.status(400).json({
          success: false,
          errors: JSON.parse(err.message),
        })
      }
    }
  }
