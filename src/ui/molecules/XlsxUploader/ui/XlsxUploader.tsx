import {ChangeEvent, DragEvent, useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {validateXlsx, XlsxValidationError} from '../helpers/validateXlsx';
import {XlsxFileParams} from "../types";

type Props = {
    sourceSystemName: string;
    uploadFile: (file: File) => Promise<void>;
    isFileLoading: boolean;
    error?: string;
} & XlsxFileParams

export const XlsxUploader = (props: Props) => {
    const {
        sourceSystemName,
        uploadFile,
        isFileLoading: isNetworkLoading,
        error: networkError,
        ...xlsxFileParams
    } = props

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState(networkError);

    useEffect(() => {
        setError(networkError)
    }, [networkError]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        await processFile(file);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setError('')
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (!e.dataTransfer.files?.length) return;

        const file = e.dataTransfer.files[0];
        await processFile(file);
    };

    const processFile = async (file: File) => {
        setIsLoading(true);
        setError('');

        try {
            await validateXlsx({file, ...xlsxFileParams});
            setSelectedFile(file);
        } catch (e) {
            setError(e instanceof XlsxValidationError
                ? e.message
                : 'An unknown error occurred'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        await uploadFile(selectedFile);

        setSelectedFile(null);
    };

    const loading = isLoading || isNetworkLoading

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                minWidth: 400,
                p: 6,
                background: isDragging ? 'lightblue' : 'lightgray',
                position: 'relative',
                cursor: 'pointer',
                borderRadius: 2,
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={loading}
                    style={{display: 'none'}}
                />
            </label>

            {!isDragging && !selectedFile && !error && !loading
                ? <Typography>Drag and drop {sourceSystemName} Excel data here or click to select</Typography>
                : null}

            {isDragging ? <Typography>Drop the file here</Typography> : null}

            {loading ? <Typography>Loading...</Typography> : null}

            {error ? <>
                <Typography color="error">{error}</Typography>
                <Typography color="error">Try uploading another file</Typography>
            </> : null}

            {selectedFile && !loading ? (
                <>
                    <Typography>Selected file: {selectedFile.name}</Typography>
                    <Button variant="contained" onClick={handleUpload}>Upload {sourceSystemName} data</Button>
                </>
            ) : null}
        </Box>
    );
};