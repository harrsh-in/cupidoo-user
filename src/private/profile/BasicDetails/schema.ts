import { z } from 'zod';

const schema = z.object({
    username: z
        .string({
            invalid_type_error: 'username is required.',
            required_error: 'username is required.',
        })
        .nonempty('username is required.'),
    name: z
        .string({
            invalid_type_error: 'Name is required.',
            required_error: 'Name is required.',
        })
        .nonempty('Name is required.'),
    email: z
        .string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
        .nonempty('Email is required.')
        .email('Please enter a valid email address.'),
    contactNumber: z
        .string({
            invalid_type_error: 'Name is required.',
            required_error: 'Name is required.',
        })
        .nonempty('Name is required.'),
    dob: z
        .string({
            invalid_type_error: 'Name is required.',
            required_error: 'Name is required.',
        })
        .nonempty('Name is required.'),
});

export default schema;

export type SignInFormSchemaType = z.infer<typeof schema>;
