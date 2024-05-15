import commonAPI from "./commonAPI";
import SERVER_URL from "./server_url";

export const addEmployeeAPI = async (employeeDetails) =>{
    return await commonAPI("POST",`${SERVER_URL}/employeeDetails`,employeeDetails)
}

export const getAllEmpAPI = async () =>{
    return await commonAPI("GET",`${SERVER_URL}/employeeDetails`,"")
}

export const removeEmpAPI = async (id)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/employeeDetails/${id}`,{})
}

export const editEmpAPI = async (empid,employee)=>{
    return await commonAPI('PUT',`${SERVER_URL}/employeeDetails/${empid}`,employee)
}