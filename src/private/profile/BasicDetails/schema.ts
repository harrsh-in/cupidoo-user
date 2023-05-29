import { z } from 'zod';

const schema = z.object({
    name: z
        .string({
            invalid_type_error: 'Name is required.',
            required_error: 'Name is required.',
        })
        .nonempty('Name is required.'),
});

export default schema;

export type SignInFormSchemaType = z.infer<typeof schema>;
