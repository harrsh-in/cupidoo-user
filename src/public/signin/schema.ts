import { z } from 'zod';

const schema = z.object({
    email: z
        .string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
        .nonempty('Email is required.')
        .email('Please enter valid email address.'),
    password: z
        .string({
            invalid_type_error: 'Password is required.',
            required_error: 'Password is required.',
        })
        .nonempty('Password is required.'),
});

export default schema;

export type schemaType = z.infer<typeof schema>;
