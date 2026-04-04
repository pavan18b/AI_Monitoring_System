import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axiosInstance from '../../axios';
import Webcam from '../student/Components/WebCam';
import {
  Button,
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useSaveCheatingLogMutation } from 'src/slices/cheatingLogApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useCheatingLog } from 'src/context/CheatingLogContext';

export default function Coder() {
  const [code, setCode] = useState('// Write your code here...');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [questionId, setQuestionId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { examId } = useParams();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cheatingLog, updateCheatingLog } = useCheatingLog();
  const [saveCheatingLogMutation] = useSaveCheatingLogMutation();

  // ✅ attach user info
  useEffect(() => {
    if (userInfo) {
      updateCheatingLog((prev) => ({
        ...prev,
        username: userInfo.name,
        email: userInfo.email,
      }));
    }
  }, [userInfo]);

  // ✅ fetch coding question
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axiosInstance.get(`/coding/questions/exam/${examId}`);
        if (res.data.success) {
          const q = res.data.data;
          setQuestion(q);
          setQuestionId(q._id);

          if (q.description) {
            setCode(`// ${q.description}\n\n// Write your code here...`);
          }
        } else {
          toast.error('No coding question found');
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Error loading question');
      } finally {
        setIsLoading(false);
      }
    };

    if (examId) fetchQuestion();
  }, [examId]);

  // ✅ run code
  const runCode = async () => {
    let url = '';
    if (language === 'python') url = '/run-python';
    else if (language === 'java') url = '/run-java';
    else url = '/run-javascript';

    try {
      const res = await axiosInstance.post(url, { code });
      setOutput(res.data);
    } catch (err) {
      setOutput('Error running code');
    }
  };

  // ✅ submit test
  const handleSubmit = async () => {
    if (!questionId) {
      toast.error('Question not loaded');
      return;
    }

    try {
      // submit code
      await axiosInstance.post('/coding/submit', {
        code,
        language,
        questionId,
      });

      // submit cheating log
      await saveCheatingLogMutation({
        ...cheatingLog,
        username: userInfo.name,
        email: userInfo.email,
        examId,
      }).unwrap();

      toast.success('Test submitted successfully');
      navigate('/result');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : !question ? (
        <Typography>No coding question available</Typography>
      ) : (
        <Grid container spacing={2} sx={{ flex: 1 }}>
          
          {/* Question */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5">{question.question}</Typography>
              <Typography>{question.description}</Typography>
            </Paper>
          </Grid>

          {/* Editor + Output */}
          <Grid item xs={9}>
            <FormControl sx={{ mb: 2, minWidth: 200 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
            </FormControl>

            <Editor
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
            />

            <Paper sx={{ mt: 2, p: 2 }}>
              <Typography>Output:</Typography>
              <pre>{output}</pre>
            </Paper>

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={runCode} sx={{ mr: 2 }}>
                Run
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Grid>

          {/* Webcam */}
          <Grid item xs={3}>
            <Paper sx={{ height: '200px' }}>
              <Webcam
                cheatingLog={cheatingLog}
                updateCheatingLog={updateCheatingLog}
              />
            </Paper>
          </Grid>

        </Grid>
      )}
    </Box>
  );
}