import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import marked from 'marked'
import Multiselect from 'multiselect-react-dropdown'
import { fetchEditTask, assignTask } from '../../store/projectSlice'
import Transition from './SideBarTransition'
import Image from 'next/image'
import xIcon from '../../public/assets/xIcon.svg'

export default function EditTaskModal(props) {
  const { task, show, toggleEdit, onClose, onKey, taskEdit, colId, taskId } =
    props
  const [taskBody, setTaskBody] = useState(task.body)
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [isEditActive, setEditActive] = useState(false)
  const [usersToAssign, setUsersToAssign] = useState([])
  const users = useSelector(state => state.project.users)

  const dispatch = useDispatch()

  const handleSave = async () => {
    setEditActive(false)
    await dispatch(fetchEditTask({ ...task, title: taskTitle, body: taskBody }))
    await taskEdit(true)
  }

  const onSelect = (list, item) => {
    setUsersToAssign([...usersToAssign, item])
  }

  const onRemove = (list, item) => {
    setUsersToAssign(usersToAssign.filter(e => e.id !== item.id))
  }

  const onSubmit = async e => {
    e.preventDefault()
    // console.log(`🟢  colId, taskId, usersToAssign `, colId, id, usersToAssign)
    await dispatch(assignTask({ colId, taskId, users: usersToAssign }))
    setEditActive(false)
    // await taskEdit(true)
  }

  console.log('props', props)

  if (!show) return null
  return show
    ? ReactDOM.createPortal(
        <div
          onKeyDown={onKey}
          className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none -top-30"
        >
          <Transition
            appear={true}
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-75"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-75"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-0" />
          </Transition>
          <div className="relative w-2/5 h-2/3 p-4 ">
            {/*content*/}
            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white p-2 outline-none focus:outline-none">
              {/*header*/}
              <div className="flex-col items-start p- rounded-t">
                {/*body*/}
                <div className="relative flex-auto">
                  <div className="flex items-center justify-between p-2 px-2">
                    {/* Edit | Pencil */}

                    <button
                      className="text-blue-500  font-bold capitalize tracking-wide text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
                      type="button"
                      onClick={() => setEditActive(!isEditActive)}
                    >
                      Edit Task
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 self-center"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        onClick={() => setEditActive(true)}
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    {/* Close X */}
                    <button
                      className="text-red-500 font-bold uppercase text-sm outline-none focus:outline-none pt-0.5 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        onClose()
                        toggleEdit()
                      }}
                    >
                      <Image
                        src={xIcon}
                        alt="deleteIcon"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                  <div className="px-8">
                    <div className="rounded-md p-2 px-4">
                      {isEditActive ? (
                        <div className="flex flex-col">
                          <input
                            className="text-base text-gray-800 border border-gray-500 p-2"
                            onChange={e => {
                              setTaskTitle(e.target.value)
                            }}
                            value={taskTitle}
                          />
                          <textarea
                            // ref={input => input && input.focus()}
                            className="my-4 text-sm leading-relaxed"
                            name="body"
                            value={taskBody}
                            onChange={e => setTaskBody(e.target.value)}
                            onKeyDown={e => {
                              if (
                                (e.metaKey || e.ctrlKey) &&
                                e.key === 'Enter'
                              ) {
                                handleSave()
                                onClose()
                                toggleEdit()
                              }
                            }}
                          ></textarea>
                        </div>
                      ) : (
                        <div className="my-4">
                          <h4
                            id="tenor"
                            className="tracking-normal dark:text-black"
                          >
                            {task.title}
                          </h4>
                          <hr className="mt-2"></hr>
                          <div
                            className="prose prose-sm mt-4"
                            dangerouslySetInnerHTML={{
                              __html: marked(taskBody)
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                    {/*footer*/}
                    <br />
                    <span id="tenor" className="dark:text-black">
                      Assign Users:{' '}
                    </span>
                    <div className="">
                      <form
                        onSubmit={onSubmit}
                        className="my-1 mx-auto text-sm"
                      >
                        <Multiselect
                          options={users.map(({ userId, user }) => ({
                            id: userId,
                            name: user.name,
                            email: user.email
                          }))}
                          selectedValues={users ? users[0] : {}}
                          onSelect={onSelect}
                          onRemove={onRemove}
                          displayValue="name"
                        />
                        <button className="border border-blue-500 dark:border-gray-500 hover:bg-blue-500 dark:text-skyblue rounded-lg hover:text-white dark:hover:text-white  dark:hover:bg-gray-500 p-4 py-1 text-base shadow-smease-linear transition-all duration-150 mr-2 mt-2">
                          Submit
                        </button>
                      </form>
                    </div>
                    <div className="flex justify-end">
                      <div className="flex flex-col">
                        <button
                          className="bg-blue-500 dark:bg-gray-600 text-white hover:bg-skyblue dark:text-gray-300 rounded-lg dark:hover:bg-blue-500 p-4 py-1 text-base shadow-smease-linear transition-all duration-150 mr-2"
                          type="button"
                          onClick={() => {
                            handleSave()
                            onClose()
                            toggleEdit()
                          }}
                        >
                          Save
                        </button>
                        <div className="text-xs text-gray-500 m-2 mb-2">
                          ⌘ or Ctrl Enter
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('modal')
      )
    : null
}
