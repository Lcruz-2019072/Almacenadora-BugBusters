import { useState, useEffect } from "react";
import { Input } from "./Input";
import ComboBox from "./ComboBox.jsx";
import { useTask } from "../shared/hooks/useTask.jsx";
import {
    descriptionValidationMessage,
    fechaFinValidationMessage,
    nombreValidationMessage,
    validateDescription,
    validateFechaFin,
    validateFechaInicio,
    validateNombre,
    validateNombreUsuario,
    validateApellidoUsuario,
    validateEstado,
    estadoValidationMessage,
    nombreUsuarioValidationMessage,
    apellidoUsuarioValidationMessage,
    validateFechaInicioFin
} from "../shared/validators/validator.js";
import toast from 'react-hot-toast';
import './ListaTareas.css';

export const TodoListForm = () => {
    const { addTask, updateTask, deleteTask, isLoading, getTasks, tasks } = useTask();

    const [formData, setFormData] = useState({
        nombre: {
            value: "",
            isValid: false,
            showError: false
        },
        description: {
            value: "",
            isValid: false,
            showError: false
        },
        fechaInicio: {
            value: "",
            isValid: false,
            showError: false
        },
        fechaFin: {
            value: "",
            isValid: false,
            showError: false
        },
        estado: {
            value: "",
            isValid: false,
            showError: false
        },
        nombreUsuario: {
            value: "",
            isValid: false,
            showError: false
        },
        apellidoUsuario: {
            value: "",
            isValid: false,
            showError: false
        }
    });

    const [editingTaskId, setEditingTaskId] = useState(null);

    const getClassEstado = (estado) => {
        switch (estado) {
            case 'Finalizado':
                return 'green-cell';
            case 'En proceso':
                return 'orange-cell';
            case 'Sin comenzar':
                return 'red-cell';
            default:
                return '';
        }
    };

    const reordenarTareasPorEstado = (tasks) => {
        const tareaPorEstado = {
            "Sin comenzar": [],
            "En proceso": [],
            "Finalizado": []
        };

        tasks.forEach(task => {
            tareaPorEstado[task.estado].push(task);
        });

        const tareasOrdenadas = [
            ...tareaPorEstado["Sin comenzar"],
            ...tareaPorEstado["En proceso"],
            ...tareaPorEstado["Finalizado"]
        ];

        return tareasOrdenadas;
    }

    const fetchTasks = async () => {
        try {
            await getTasks();
        } catch (error) {
            console.error("Error al obtener las tareas en fetchTasks:", error);
        }
    };

    const handleValueChange = (value, field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }));
    };

    const handleValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "nombre":
                isValid = validateNombre(value);
                break;
            case "description":
                isValid = validateDescription(value);
                break;
            case "fechaInicio":
                isValid = validateFechaInicio(value);
                break;
            case "fechaFin":
                isValid = validateFechaFin(value);
                break;
            case "estado":
                isValid = validateEstado(value);
                break;
            case "nombreUsuario":
                isValid = validateNombreUsuario(value);
                break;
            case "apellidoUsuario":
                isValid = validateApellidoUsuario(value);
                break;
            default:
                break;
        }
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if(!validateFechaInicioFin(formData.fechaInicio.value, formData.fechaFin.value)){
            return toast.error('La fecha de inicio debe ser menor a la fecha de fin');
        }
        try {
            if (editingTaskId) {
                await updateTask(editingTaskId, {
                    nombre: formData.nombre.value,
                    description: formData.description.value,
                    fechaInicio: formData.fechaInicio.value,
                    fechaFin: formData.fechaFin.value,
                    estado: formData.estado.value,
                    nombreUsuario: formData.nombreUsuario.value,
                    apellidoUsuario: formData.apellidoUsuario.value
                });
                toast.success('Tarea actualizada correctamente');
            } else {
                await addTask(
                    formData.nombre.value,
                    formData.description.value,
                    formData.fechaInicio.value,
                    formData.fechaFin.value,
                    formData.estado.value,
                    formData.nombreUsuario.value,
                    formData.apellidoUsuario.value
                );
                toast.success('Tarea agregada correctamente');
            }
            setFormData({
                nombre: {
                    value: "",
                    isValid: false,
                    showError: false
                },
                description: {
                    value: "",
                    isValid: false,
                    showError: false
                },
                fechaInicio: {
                    value: "",
                    isValid: false,
                    showError: false
                },
                fechaFin: {
                    value: "",
                    isValid: false,
                    showError: false
                },
                estado: {
                    value: "",
                    isValid: false,
                    showError: false
                },
                nombreUsuario: {
                    value: "",
                    isValid: false,
                    showError: false
                },
                apellidoUsuario: {
                    value: "",
                    isValid: false,
                    showError: false
                }
            });
            setEditingTaskId(null);
            fetchTasks();
        } catch (error) {
            console.error('Error al agregar/actualizar la tarea:', error);
            toast.error('Error al agregar/actualizar la tarea');
        }
    };

    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task._id === taskId);
        if (taskToEdit) {
            setFormData({
                nombre: {
                    value: taskToEdit.nombre,
                    isValid: true,
                    showError: false
                },
                description: {
                    value: taskToEdit.description,
                    isValid: true,
                    showError: false
                },
                fechaInicio: {
                    value: taskToEdit.fechaInicio,
                    isValid: true,
                    showError: false
                },
                fechaFin: {
                    value: taskToEdit.fechaFin,
                    isValid: true,
                    showError: false
                },
                estado: {
                    value: taskToEdit.estado,
                    isValid: true,
                    showError: false
                },
                nombreUsuario: {
                    value: taskToEdit.nombreUsuario,
                    isValid: true,
                    showError: false
                },
                apellidoUsuario: {
                    value: taskToEdit.apellidoUsuario,
                    isValid: true,
                    showError: false
                }
            });
            setEditingTaskId(taskId);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            try {
                await deleteTask(taskId);
                toast.success('Tarea eliminada correctamente');
                fetchTasks();
            } catch (error) {
                console.error('Error al eliminar la tarea:', error);
                toast.error('Error al eliminar la tarea');
            }
        }
    };

    const isSubmitButtonDisabled =
        !formData.nombre.isValid ||
        !formData.description.isValid ||
        !formData.fechaInicio.isValid ||
        !formData.fechaFin.isValid ||
        !formData.estado.isValid ||
        !formData.nombreUsuario.isValid ||
        !formData.apellidoUsuario.isValid;

    return (
        <div className="todo-list-container">
            <form className="todo-form" onSubmit={handleAddTask}>
                <Input
                    field="nombre"
                    label="Nombre de la tarea"
                    value={formData.nombre.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.nombre.showError}
                    validationMessage={nombreValidationMessage}
                />

                <Input
                    field="description"
                    label="Descripción"
                    value={formData.description.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.description.showError}
                    validationMessage={descriptionValidationMessage}
                />

                <Input
                    field="fechaInicio"
                    label="Fecha de inicio"
                    value={formData.fechaInicio.value}
                    onChangeHandler={handleValueChange}
                    type="date"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.fechaInicio.showError}
                    validationMessage={validateFechaInicio}
                />

                <Input
                    field="fechaFin"
                    label="Fecha de fin"
                    value={formData.fechaFin.value}
                    onChangeHandler={handleValueChange}
                    type="date"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.fechaFin.showError}
                    validationMessage={fechaFinValidationMessage}
                />

                <ComboBox
                    label="Estado"
                    options={[
                        { value: "", label: "--Seleccione una opción--" },
                        { value: "Finalizado", label: "Finalizado" },
                        { value: "En proceso", label: "En proceso" },
                        { value: "Sin comenzar", label: "Sin comenzar" }
                    ]}
                    value={formData.estado.value}
                    onChange={(e) => handleValueChange(e.target.value, "estado")}
                    onBlur={(e) => handleValidationOnBlur(e.target.value, "estado")}
                    showErrorMessage={formData.estado.showError}
                    validationMessage={estadoValidationMessage}
                />

                <Input
                    field="nombreUsuario"
                    label="Nombre de la persona"
                    value={formData.nombreUsuario.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.nombreUsuario.showError}
                    validationMessage={nombreUsuarioValidationMessage}
                />

                <Input
                    field="apellidoUsuario"
                    label="Apellido de la persona"
                    value={formData.apellidoUsuario.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.apellidoUsuario.showError}
                    validationMessage={apellidoUsuarioValidationMessage}
                />
                <div></div>
                <button disabled={isSubmitButtonDisabled}>
                    {editingTaskId ? 'Actualizar Tarea' : 'Agregar Tarea'}
                </button>
            </form>
            <div className="table-container">
                <h2>Tareas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Tarea</th>
                            <th>Descripción</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Finalización</th>
                            <th>Estado</th>
                            <th>Nombre Usuario</th>
                            <th>Apellido Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.length > 0 && reordenarTareasPorEstado(tasks).map((task, index) => (
                            <tr key={index}>
                                <td>{task.nombre}</td>
                                <td>{task.description}</td>
                                <td>{task.fechaInicio}</td>
                                <td>{task.fechaFin}</td>
                                <td className={getClassEstado(task.estado)}>{task.estado}</td>
                                <td>{task.nombreUsuario}</td>
                                <td>{task.apellidoUsuario}</td>
                                <td>
                                    <svg onClick={() => handleEditTask(task._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    <svg onClick={() => handleDeleteTask(task._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
