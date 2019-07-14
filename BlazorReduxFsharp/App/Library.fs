namespace MyLogic

type MyState =
    {
        Location: string;
        Count: int;
    }


type MyMessage =
    | IncrementByOne
    | DecrementByOne
    | ChangeLocation of location : string
    

module MyFunctions =

    let MyReducer state action =
        match action with
            | IncrementByOne -> { state with Count = state.Count + 1 }
            | DecrementByOne -> { state with Count = state.Count - 1 }
            | ChangeLocation location -> { state with Location = location }