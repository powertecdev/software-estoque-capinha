import type { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(`[ERROR] ${err.message}`);

  if (err.message.includes('não encontrad') || err.message.includes('not found')) {
    res.status(404).json({ success: false, error: err.message });
    return;
  }

  if (err.message.includes('Já existe') || err.message.includes('already exists')) {
    res.status(409).json({ success: false, error: err.message });
    return;
  }

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Erro interno do servidor' : err.message,
  });
}
