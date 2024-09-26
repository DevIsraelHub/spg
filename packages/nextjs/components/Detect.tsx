"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Detect = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        formData.append('text', text);
      }

      const response = await axios.post('/api/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(response.data.result);
    } catch (error) {
      console.error('Error detecting content:', error);
      setResult('Error detecting content');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Detection Platform</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Input */}
        <div>
          <label className="block text-lg font-medium mb-2">Enter Text:</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your content here..."
          ></textarea>
        </div>

        {/* File Input */}
        <div>
          <label className="block text-lg font-medium mb-2">Or Upload File:</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn btn-primary w-full`}
          disabled={loading}
        >
          {loading ? 'Detecting...' : 'Detect AI'}
        </button>
      </form>

      {/* Detection Result */}
      {!loading && result && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Detection Result:</h2>
          <p className={`mt-4 text-xl ${result.includes('AI') ? 'text-red-600' : 'text-green-600'}`}>
            {result}
          </p>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-8 flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default Detect;
