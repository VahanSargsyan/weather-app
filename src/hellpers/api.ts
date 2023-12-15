type DataWithError = {
  error?: {
    code: number;
    message: string;
  };
};

export const errorCheck = <T extends DataWithError | null>(data: T) => {
  if (data?.error) {
    throw new Error(data.error.message);
  }
  return data;
};
