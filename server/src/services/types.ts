export type GradesRequest = {
    year: string;
    semester: string;
    department: string;
    degree: string;
    courseNumber: string;
};

export const constants = {
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
    ACCESSIBLE: 'yes',
};
