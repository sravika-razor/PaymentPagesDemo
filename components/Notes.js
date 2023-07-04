import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const NotesSection = (props) => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(props.notes);

  const handleAddNote = () => {
    if (note.length > 0) {
      const newNote = {
        id: Date.now().toString(),
        note: note,
      };
      setNotes([...notes, newNote]);
      setNote("");
    }
  };

  const handleDeleteNote = (id) => {
    const filteredNotes = notes.filter((item) => item.id !== id);
    setNotes(filteredNotes);
  };

  const showNotes = () => {
    return (
      <FlatList
        style={styles.list}
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.note_container}>
            <View style={styles.note}>
              <Text style={styles.notesText}>{item.note}</Text>
            </View>
            <View style={{ margin: 5 }}>
              <TouchableOpacity
                style={{ width: 20 }}
                onPress={() => handleDeleteNote(item.id)}
              >
                <Image
                  source={require("../icons/icons8-delete-24.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.newnote_container}>
        <TextInput
          style={styles.input}
          placeholder="Add Note..."
          onChangeText={(text) => setNote(text)}
          value={note}
        />
        <View style={styles.add_button}>
          <TouchableOpacity onPress={handleAddNote}>
            <Text style={{ color: "white" }}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showNotes()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "85%",
  },
  newnote_container: {
    flexDirection: "row",
  },
  note_container: {
    flexDirection: "row",
    // margin: 2,
    alignItems: "left",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 1,
    marginBottom: 5,
    marginRight: 5,
  },
  add_button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#5A96E3",
    marginBottom: 5,
    marginRight: 5,
  },
  list: {
    width: "90%",
  },
  note: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 2,
    marginTop: 2,
    maxWidth: "85%",
  },
  notesText: {
    flex: 1,
    margin: 5,
  },
});

export default NotesSection;
