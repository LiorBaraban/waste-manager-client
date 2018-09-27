
enum SuggestionAction{
        add,
        remove,
        change
    }

enum SuggestionEntity{
        Bin,
        Day
    }

export class Suggestion{
    suggestionAction : SuggestionAction;
    suggestionEntity : SuggestionEntity;
    entityIds : Array<number>;
}

