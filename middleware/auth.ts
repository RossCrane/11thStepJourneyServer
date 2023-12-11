import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/UserModel';
const { ACCESS_TOKEN_SECRET } = process.env;

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res
			.status(401)
			.json({ status: false, msg: 'Authorization header not found' });
		return;
	}

	const parts = authHeader.split(' ');
	if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
		res.status(401).json({
			status: false,
			msg: 'Authorization header is malformed',
		});
		return;
	}

	const token = parts[1];

	try {
		jwt.verify(token, ACCESS_TOKEN_SECRET, async (error, decoded: any) => {
			if (error) {
				console.error('Token verification failed', error.message);
				res.status(401).json({ status: false, error: error.message });
				return; //
			} else {
				const user = await UserModel.findById(decoded.id).select('-password');

				if (!user) {
					res.status(401).json({ status: false, msg: 'User not found' });
					return;
				}

				(req as any).body.user = user;
				next();
			}
		});
	} catch (err) {
		console.error(err);

		res.status(401).json({ status: false, msg: 'Invalid token' });
		return;
	}
};

export default authMiddleware;
