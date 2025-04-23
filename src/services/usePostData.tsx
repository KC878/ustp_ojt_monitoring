export const postData = async (
  apiPostPage: string,
  postColumns: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postValues: any[],
) => {
  const requestBody = postColumns.reduce((acc, key, index) => {
    acc[key] = postValues[index];
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any>);

  try {
    const res = await fetch(apiPostPage, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const responseData = await res.json();

    return {
      ok: res.ok,
      message: responseData.message,
      data: responseData,
      status: res.status,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  } catch (error: any) {
    const errMsg = error.message || 'Unknown error';
    return {
      ok: false,
      message: errMsg,
      data: null,
      status: 500,
    };
  }
};
