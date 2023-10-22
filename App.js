import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import TaskList from './src/components/TaskList';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      {/* Heading Text */}
      <View style = {styles.tasksWrapper}>
        <Text style = {styles.sectionTitle}>Hello! Here are the tasks for today:</Text>

        <View style = {styles.items}>
            {/* Task list */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() =>completeTask(index)}>
                    <TaskList text={item}/>
                  </TouchableOpacity>
                )
              })
            }
          {/* <TaskList text = {'Task 1'} />
          <TaskList text = {'Task 2'} />   */}
        </View>
      </View>

      {/* Add Task */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style = {styles.writeTaskWrapper}
      >

        <TextInput style={styles.input} placeholder={"Add a new task"} value={task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e3e42',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 25, 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#E4E4E4',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#E4E4E4',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {},
});

