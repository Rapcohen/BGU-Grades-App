import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import fs from 'fs';
import { constants, GradesRequest } from './types';

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
 * @returns the grades pdf data for the given course.
 * @throws {Error} if the request failed.
 * @param gradesRequest
 */
export async function getGradesFromBGU(
    gradesRequest: GradesRequest
): Promise<string> {
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: constants.BGU_SERVER_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

        data: getRequestBody(gradesRequest),
        timeout: 20000,
    };

    console.log('Sending request to BGU server...');
    const response: AxiosResponse = await axios(request);

    if (response.status === 200) {
        console.log('Request successful');
        return response.data;
    }

    throw new Error('Failed to fetch grades from BGU server');
}

function getRequestBody(gradesRequest: GradesRequest): string {
    return qs.stringify({
        server: constants.SERVER,
        report: constants.REPORT,
        p_key: constants.P_KEY,
        p_year: gradesRequest.year,
        p_semester: gradesRequest.semester,
        out_institution: constants.OUT_INSTITUTION,
        grade: constants.GRADE,
        list_department: `*${gradesRequest.department}@`,
        list_degree_level: `*${gradesRequest.degree}@`,
        list_course: `*${gradesRequest.courseNumber}@`,
        LIST_GROUP: constants.LIST_GROUP,
        P_FOR_STUDENT: constants.P_FOR_STUDENT,
        envid: constants.ENV_ID,
        cmdkey: constants.CMD_KEY,
        destype: constants.DES_TYPE,
        desformat: constants.DES_FORMAT,
        accessible: constants.ACCESSIBLE,
    });
}
