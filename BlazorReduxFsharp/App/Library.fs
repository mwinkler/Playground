namespace MyLogic

open Shared

type MyState =
    {
        Location: string;
        Count: int;
        Name: string;
    }


type MyMessage =
    | IncrementByOne
    | DecrementByOne
    | ChangeLocation of location : string
    | GetByApi of string
    | Test of arg1 : string * arg2 : bool
    | ByModel of m : Model
    | AsyncDirect of string
    | OtherState
    


module MyFunctions =

    let rec MyReducer state action =
        match action with
            | IncrementByOne -> { state with Count = state.Count + 1 }
            | DecrementByOne -> { state with Count = state.Count - 1 }
            | ChangeLocation location -> { state with Location = location }
            | GetByApi value -> { state with Name = Api.Instance.GetValue value }
            | Test (a1, a2) ->  { state with Name = a1 + a2.ToString() }
            | ByModel m -> state
            | AsyncDirect a -> { state with Name = Api.Instance.GetSomething(a) |> Async.AwaitTask |> Async.RunSynchronously }
            | OtherState -> 
                MyReducer state MyMessage.IncrementByOne 
                |> fun ostate -> { ostate with Count = ostate.Count + 1 }
    