import db from '@src/lib/database/db'

export async function checkEmailExist(email: string): Promise<boolean> {
  const [rows]: any = await db.query(
    'SELECT email FROM Users WHERE email = ?',
    [email]
  );
  return rows.length > 0;
}
