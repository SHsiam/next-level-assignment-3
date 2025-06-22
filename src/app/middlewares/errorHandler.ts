export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message || err,
  });
};
