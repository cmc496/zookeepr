const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');

const { zookeepers } = require('../data/zookeepers');

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Dan", id: "jhgdja3ng3"},
        zookeepers
    );

    expect(zookeeper.name).toBe("Dan");
    expect(zookeeper.id).toBe("jhgdja3ng3");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Eithan",
            age: 22,
            favoriteAnimal: "bear"
        },
        {
            id: "4",
            name: "Nathan",
            age: 45,
            favoriteAnimal: "lemur"
        },
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "bear" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Eithan",
            species: "gorilla",
            age: 22,
            favoriteAnimal: "bear"
        },
        {
            id: "4",
            name: "Nathan",
            age: 45,
            favoriteAnimal: "lemur"
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Eithan");
});

test("validates age", () => {
    const zookeeper = {
        id: "3",
        name: "Eithan",
        age: 22,
        favoriteAnimal: "bear"
    };

    const invalidZookeeper = {
        id: "3",
        name: "Erica",
        favoriteAnimal: "bear"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});