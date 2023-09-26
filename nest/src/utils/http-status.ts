export type HttpStatusMessages = {
  ECONNREFUSED: string;
  '403': string;
  '404': string;
  '405': string;
  '406': string;
  '408': string;
  '413': string;
  '414': string;
  '422': string;
  '428': string;
  '429': string;
  '500': string;
  '501': string;
  '502': string;
  '503': string;
  '504': string;
  '507': string;
  '508': string;
};

export const httpStatusMessages: HttpStatusMessages = {
  ECONNREFUSED: 'Connection Refused',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '408': 'Request Timeout',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '422': 'Unprocessable Entity',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '500': 'Internal Server Error.',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
};
