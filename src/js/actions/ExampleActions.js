function addOne(payload) {
    return {
        type: 'EXAMPLE_ADD_ONE',
        payload,
    };
}

const ExampleActions = {
    addOne,
};

export default ExampleActions;
