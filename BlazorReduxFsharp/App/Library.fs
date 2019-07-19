namespace MyLogic

open Shared

type SubState =
    {
        Message: string;
        Success: bool;
    }

type NullState =
    | Null
    | Data of string

type MyState =
    {
        Location: string;
        Count: int;
        Name: string;
        Substate: SubState;
        Content : NullState
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
    | StateResponse of request : Request
    | SetData of string
    | SetNull
    


type MyFunctions (api: IApi) =

    member this.MyReducer state action =
        match action with
            | IncrementByOne -> { state with Count = state.Count + 1 }
            | DecrementByOne -> { state with Count = state.Count - 1 }
            | ChangeLocation location -> { state with Location = location }
            | GetByApi value -> { state with Name = api.GetValue value }
            | Test (a1, a2) ->  { state with Name = a1 + a2.ToString() }
            | ByModel m -> state
            | AsyncDirect a -> { state with Name = api.GetSomething(a) |> Async.AwaitTask |> Async.RunSynchronously }
            | OtherState -> 
                this.MyReducer state MyMessage.IncrementByOne 
                |> fun ostate -> { ostate with Count = ostate.Count + 1 }
            | StateResponse request ->
                api.GetResponse(request) |> Async.AwaitTask |> Async.RunSynchronously
                |> fun response ->
                    match response.Success with
                        | true -> { state with Substate = { Success = true; Message = response.Message } }
                        | _ ->  { state with Substate = { Success = false; Message = response.Message } }
            | SetData data -> { state with Content = NullState.Data data }
            | SetNull -> { state with Content = NullState.Null }
    