import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import fs from 'fs';

const constants = {
    BGU_SERVER_URL: 'https://reports4u22.bgu.ac.il/reports/rwservlet',
    SERVER: 'aristo4stu419c',
    REPORT: 'SCRR016w',
    P_KEY: '1', // this key has no significance
    OUT_INSTITUTION: '0',
    GRADE: '5',
    LIST_GROUP: '*@',
    P_FOR_STUDENT: '1',
    ENV_ID: 'AM',
    CMD_KEY: 'prod',
    DES_TYPE: 'cache',
    DES_FORMAT: 'pdf',
    ACCESSIBLE: 'yes'
};

/**
 * Saves the pdf file in the local file system.
 * Note: this function should only be used during development.
 * @param pdfData - the pdf data to save
 * @param fileName - the file name to save the pdf data to
 */
function savePdfFile(pdfData: string, fileName: string) {
    const dirName = 'grades';
    const filePath = `${dirName}\\${fileName}.pdf`;
    try {
        console.log('Saving pdf file...');
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
        fs.writeFileSync(filePath, pdfData);
        console.log(`Successfully saved file: ${filePath}`);
    } catch (error) {
        console.log(`Failed to save pdf file!\nerror: ${error}`);
    }
}

/**
 * Retrieves the grades pdf data from the BGU server.
 * @param year
 * @param semester 
 * @param department 
 * @param degree 
 * @param courseNumber 
 * @returns the grades pdf data for the given course.
 * @throws {Error} if the request failed.
 */
export async function getGradesFromBGU(year: number, semester: number, department: number, degree: number, courseNumber: number): Promise<string> {
    const body: string = qs.stringify({
        server: constants.SERVER,
        report: constants.REPORT,
        p_key: constants.P_KEY,
        p_year: year,
        p_semester: semester,
        out_institution: constants.OUT_INSTITUTION,
        grade: constants.GRADE,
        list_department: `*${department}@`,
        list_degree_level: `*${degree}@`,
        list_course: `*${courseNumber}@`,
        LIST_GROUP: constants.LIST_GROUP,
        P_FOR_STUDENT: constants.P_FOR_STUDENT,
        envid: constants.ENV_ID,
        cmdkey: constants.CMD_KEY,
        destype: constants.DES_TYPE,
        desformat: constants.DES_FORMAT,
        accessible: constants.ACCESSIBLE
    });

    const config: AxiosRequestConfig = {
        method: 'POST',
        url: constants.BGU_SERVER_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body
    };

    console.log("Sending request to BGU server...");
    const response: AxiosResponse = await axios(config);

    if (response.status === 200) {
        console.log('Request successful');
        savePdfFile(response.data, `${year}-${semester}_${department}-${degree}-${courseNumber}`); // remove this before deployment
        return response.data;
    }

    throw new Error('Failed to fetch grades from BGU server');
}