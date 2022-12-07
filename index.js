const yup = require('yup');

const data = {
    firstName: 'john',
    lastName: 'doe',
    age: 25,
    email: 'john.doe@email.com',
    created: new Date(2021, 5, 5)
}

const simpleSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    age: yup.number(),
    email: yup.string(),
    created: yup.date(),
});

const complexSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string()
                .required("Last name is required").min(2),
    age: yup.number()
            .required()
            .min(30)
            .max(50, "Value needs to be less than 50"),
    email: yup.string().required().email(),
    created: yup.date().required(),
});

const invalidData = {
    lastName: "a",
    age: 80,
    email: "blob",
    created: "Some invalid string"
}


complexSchema.validate(invalidData, { abortEarly: false }).catch(function(errors) {
    errors.inner.forEach(error => {
        console.log(error.path, error.name, error.errors)
    })
});

let numberSchema = yup.array().of(yup.number().min(2));

let nestedObjectSchema = yup.object().shape({
    name: yup.string(),
    address: yup.object().shape({
        addressLine1: yup.string(),
        addressLine2: yup.string(),
        town: yup.string(),
        country: yup.string(),
    })
})