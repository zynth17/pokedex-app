import Spinner from "@/components/Loader/Spinner";
import { db } from "@/db";
import styled from "@emotion/styled";
import { useLiveQuery } from "dexie-react-hooks";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";

const PokemonCard = React.lazy(
    () => import("@/components/Pokemons/PokemonCard")
);
const MyPokemonContainer = styled.div`
    padding: 2rem;
    min-height: 80vh;
    display: grid;
    place-items: center;
`;

const NoPokemonText = styled.h4`
    font-size: 2rem;
    @media screen and (max-width: 991px) {
        font-size: 1.5rem;
    }
    @media screen and (max-width: 525px) {
        font-size: 1rem;
    }
`;
const MyPokemonTitle = styled.h1`
    margin: 2rem 0 0 2rem;
`;

const MyPokemonCount = styled.h4`
    margin: 0.5rem 0 0 2rem;
`;
const MyPokemon = () => {
    const myPokemons = useLiveQuery(() => db.pokemon.toArray());
    const ownedPokemon = useLiveQuery(() => db.pokemon.count());
    if (!myPokemons || myPokemons.length === 0)
        return (
            <MyPokemonContainer>
                <NoPokemonText>You haven't catch any pokemon yet</NoPokemonText>
            </MyPokemonContainer>
        );

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <MyPokemonTitle>My Pokemons</MyPokemonTitle>
                <MyPokemonCount>
                    Total pokemon owned : {ownedPokemon}
                </MyPokemonCount>
                <div className="pokemon--container">
                    {myPokemons.map(pokemon => (
                        <Link
                            to={`/pokemon/${pokemon.name}`}
                            key={pokemon.dbid}
                        >
                            <PokemonCard isMyPokemon pokemon={pokemon} />
                        </Link>
                    ))}
                </div>
            </Suspense>
        </>
    );
};

export default MyPokemon;
