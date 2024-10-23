import List "mo:base/List";
import Debug "mo:base/Debug";

actor Dkeeper{
    public type Note=    //defining a data type called note
    {
        title:Text;
        content:Text;
    };

   stable var notes:List.List<Note> = List.nil<Note>(); //a list with Note type objects intialized to nil

   public func createNote(titleText:Text , contentText:Text){
    let newNote:Note = {
        title=titleText;
        content=contentText;
        };
     notes:=List.push(newNote,notes);
     Debug.print(debug_show(notes));
   };

   public query func readNotes(): async [Note]  //this query(fast read only) function returns an array of Note objects as output
    {
    return List.toArray(notes);  //converting the list to array to facilitate JS operations in the frontend
    };

    public func removeNote(id:Nat){
        let l1=List.take(notes,id);
        let l2=List.drop(notes,id+1);
        notes := List.append(l1,l2);
    };
}