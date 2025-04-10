export const postData = async (
  apiPostPage: string,
  postColumns: string[],
  postValues: any[],
) => {
  const requestBody = postColumns.reduce((acc, key, index) => {
    acc[key] = postValues[index];
    return acc;
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
      data: responseData.data,
    };
  } catch (error: any) {
    const errMsg = error.message || 'Unknown error';
    return {
      ok: false,
      message: errMsg,
      data: null,
    };
  }
};
