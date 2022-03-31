import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import React, { Component } from "react";
import api from "./api/axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      todoTitle: "",
      addStatus: false,
      editStatusId: "",
    };
  }
  async componentDidMount() {
    const todoList = await api.get("/get/todoList");
    this.setState({ todoList: todoList.data.apiData });
  }

  async addTodo() {
    const res = await api.post(`/post/addTodo`, {
      title: this.state.todoTitle,
    });
    if (res.data.status == 200) {
      const newTodoList = await api.get(`/get/todoList`);
      this.setState({ todoList: newTodoList.data.apiData });
    }
  }

  async editTodo(id) {
    await api.put(`/put/todo?id=${id}`, { title: this.state.todoTitle });
    const newTodoList = await api.get(`/get/todoList`);
    this.setState({ todoList: newTodoList.data.apiData });
    this.setState({ editStatusId: "" });
  }

  async deleteTodo(id, val) {
    const res = await api.delete(`/delete/todo?id=${id}`);
    if (res.data.status == 200) {
      const updatedArr = this.state.todoList.filter((w) => w._id !== val._id);
      this.setState({ todoList: updatedArr });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {this.state.todoList.map((val, idx) => {
            return (
              <View style={styles.eachTodoView} key={idx}>
                <Text style={styles.eachTodoText}>{val.title}</Text>
                {this.state.editStatusId != val._id && (
                  <Button
                    title="Edit"
                    onPress={() => {
                      this.setState({ editStatusId: val._id });
                    }}
                  />
                )}
                {this.state.editStatusId == val._id && (
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      title="X"
                      onPress={() => this.setState({ editStatusId: "" })}
                    />
                    <TextInput
                      onChangeText={(title) => {
                        this.setState({ todoTitle: title });
                      }}
                      style={styles.input}
                      placeholder="Enter title.."
                    />
                    <Button title="->" onPress={() => this.editTodo(val._id)} />
                  </View>
                )}
                <Button
                  title="Delete"
                  onPress={() => this.deleteTodo(val._id, val)}
                />
              </View>
            );
          })}
          {!this.state.addStatus && (
            <Button
              title="Add Todo"
              onPress={() => this.setState({ addStatus: true })}
            />
          )}
          {this.state.addStatus && (
            <View>
              <Button
                title="X"
                onPress={() => this.setState({ addStatus: false })}
              />
              <TextInput
                onChangeText={(title) => {
                  this.setState({ todoTitle: title });
                }}
                style={styles.input}
                placeholder="Enter title.."
              />
              <Button title="Add" onPress={() => this.addTodo()} />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  eachTodoView: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  eachTodoText: {
    fontSize: 20,
    marginTop: 5,
    marginRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 7,
    padding: 10,
  },
});

export default App;
