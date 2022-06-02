export default class KanbanAPI{
    static getItems(columnId){
        //Find the matched column id//
        const column = read().find(column => column.id == columnId);
        //If none of column here, return a empty array.//
        if(!column){
            return [];
        } 
        
        return column.items
    }

    
    static insertItem(columnId, content){
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        };

        if (!column){
            throw new Error("Cannot find any matched coloumn.");
        }

        column.items.push(item);
        save(data);

        return item;
    }



    static updateItem(itemId, updateContent){
        const data = read();
        const [item, currentPosition] = (
            () => {for (const column of data){
            const item = column.items.find(item => item.id ==itemId);

            if(item){return [item, column];}
        }
        })();

        if (!item) {
            throw new Error("Cannot find any item.");
        }

        item.content = updateContent.content === undefined ? item.content : updateContent.content;
        
        // Update function setting
        if(
            updateContent.columnId !== undefined && updateContent.position !== undefined        )
        {
            const trackedColumn = data.find(column => column.id == updateContent.columnId)

           if (!trackedColumn){
               throw new Error ("Cannot find any tracked column.");
           }
        // Set delete function. Delete current content from current position.
           currentPosition.items.splice(currentPosition.items.indexOf(item), 1);

        //Set move function. Move content from old position to new position and column.
        trackedColumn.items.splice(updateContent.position, 0, item)
        }

        save(data);
    }

    static deleteItem(itemId) {
		const data = read();

		for (const column of data) {
			const item = column.items.find(item => item.id == itemId);

			if (item) {
				column.items.splice(column.items.indexOf(item), 1);
			}
		}

		save(data);
	}
}

function read(){
    const json = localStorage.getItem("taskData");

    if (! json){ 
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            }
        ]; //return item for the users if they run the kanban for the first time//
    }

    return JSON.parse(json);
}

function save(data){
    localStorage.setItem("taskData", JSON.stringify(data));
}
