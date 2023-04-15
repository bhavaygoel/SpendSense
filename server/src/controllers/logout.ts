import { Request, Response } from "express";

export async function logout(req: Request, res: Response) {
    res.clearCookie('user');
    res.send('Logged out successfully');
}
