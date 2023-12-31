import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../utils/token';

import { UserModel } from '../models/UserModel';

interface IUser extends Document {
	_id: string;
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	soberDate?: Date;
	phone?: string;
	anonymousFlag?: boolean;
	state?: string;
	city?: string;
	aaFlag?: boolean;
	caFlag?: boolean;
	naFlag?: boolean;
	homeGroup?: string;
}

export const register = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });

	if (user) {
		return res.status(400).send({
			res: { data: 'This email already exists!', statusCode: 400 },
			error: true,
		});
	}
	try {
		if (!email || !password) {
			return res.status(400).send({
				res: { data: 'Invalid Form Fields!', statusCode: 400 },
				error: true,
			});
		}

		if (password.length < 5) {
			return res.status(400).send({
				res: {
					data: 'Password should be at least 5 characters!',
					statusCode: 400,
				},
				error: true,
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await UserModel.create({
			email,
			password: hashedPassword,
		});
		const token: string = createAccessToken({ id: user._id });
		res.status(200).json({ token, msg: 'Congratulations!! Account created ' });
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			res: { data: 'Internal Server Error!', statusCode: 500 },
			error: true,
		});
	}
};

export const login = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send({
				res: { data: 'Invalid email or password', statusCode: 400 },
				error: true,
			});
		}

		const user: IUser | null = await UserModel.findOne({ email });
		if (!user) {
			return res.status(400).send({
				res: { data: 'This email is not registered!', statusCode: 400 },
				error: true,
			});
		}

		const isMatch: boolean = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send({
				res: { data: 'Incorrect Password!', statusCode: 400 },
				error: true,
			});
		}

		const token: string = createAccessToken({ id: user._id });

		res
			.status(200)
			.json({ token, user, status: true, msg: 'Login successful..' });
	} catch (e) {
		console.log(e);
		return res
			.status(401)
			.send({ error: '401', message: 'Username or password is incorrect' });
	}
};

export const profile = async (
	req: Request & { user: IUser },
	res: Response
): Promise<void | Response> => {
	try {
		const userId = req.body.user._id;

		const updatedUserData: Partial<IUser> = req.body;

		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			updatedUserData,
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error, message: 'Internal Server Error' });
	}
};

export const getProfile = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const userId: string = req.body.user?._id;

		const user: IUser | null = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({
				error: true,
				message: 'User not found',
			});
		}

		const userProfile = {
			_id: user._id,
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			soberDate: user.soberDate,
			phone: user.phone,
			anonymousFlag: user.anonymousFlag,
			state: user.state,
			city: user.city,
			aaFlag: user.aaFlag,
			caFlag: user.caFlag,
			naFlag: user.naFlag,
			homeGroup: user.homeGroup,
		};

		res.status(200).json({
			success: true,
			data: userProfile,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: true,
			message: 'Internal Server Error',
		});
	}
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: IUser[] = await UserModel.find({}, '_id firstName');

		const modifiedUsers = users.map((user) => ({
			...user._doc,
			firstName: user.firstName || 'Anon',
		}));

		res.json(modifiedUsers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching users' });
	}
};
