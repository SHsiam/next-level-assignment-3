export const sendResponse = <T>(
  res: any,
  statusCode: number,
  message: string,
  data: T
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
