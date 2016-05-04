interface ITodoItem {
    id: number;
    name: string;
    done: boolean;
}

interface ITodoItemProps {
    item: ITodoItem;
}

interface ITodoListProps {
    items: ITodoItem[];
}

interface ITodoModel {
    todos: ITodoItem[];
}

interface IAppProps {
    model: ITodoModel;
}