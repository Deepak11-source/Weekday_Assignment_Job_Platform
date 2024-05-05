import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import JobCard from '../JobCard/JobCard';
import styles from './SearchBox.module.css'

const SearchBox = ({ jobData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedRemote, setSelectedRemote] = useState('');
  const [selectedMinSalary, setSelectedMinSalary] = useState('');

  const [experienceLevels, setExperienceLevels] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [minSalaryOptions, setMinSalaryOptions] = useState([]);

  useEffect(() => {
    if (jobData) {
      const uniqueLevels = [...new Set(jobData.flatMap(job => [job.minExp, job.maxExp]))]
        .filter(level => level !== null && !isNaN(level))
        .sort((a, b) => a - b);
      setExperienceLevels(uniqueLevels);

      const uniqueRoles = [...new Set(jobData.map(job => job.jobRole))];
      setRoleOptions(uniqueRoles);

      const uniqueMinSalaries = [...new Set(jobData.map(job => job.minJdSalary))]
        .filter(salary => salary !== null && !isNaN(salary))
        .sort((a, b) => a - b);
      setMinSalaryOptions(uniqueMinSalaries);

    }
  }, [jobData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setSelectedExperience(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRemoteChange = (event) => {
    setSelectedRemote(event.target.value);
  };

  const handleMinSalaryChange = (event) => {
    setSelectedMinSalary(event.target.value);
  };

  useEffect(() => {
    if (jobData) {
      const filtered = jobData.filter(job => {
        const matchesSearchTerm = searchTerm.trim() === '' || job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesExperience = selectedExperience === '' ||
          (job.minExp <= selectedExperience && job.maxExp >= selectedExperience);
        const matchesRole = selectedRole === '' || job.jobRole.toLowerCase().includes(selectedRole.toLowerCase());
        const matchesRemote = selectedRemote === '' || (selectedRemote === 'Yes' && job.location.toLowerCase() === 'remote');
        const matchesNonRemote = selectedRemote === 'No' && job.location.toLowerCase() !== 'remote';
        const matchesMinSalary = selectedMinSalary === '' || job.minJdSalary >= selectedMinSalary;
        return matchesSearchTerm && matchesExperience && matchesRole && (matchesRemote || matchesNonRemote) && matchesMinSalary;
      });
      setFilteredJobs(filtered);
    }
  }, [jobData, searchTerm, selectedExperience, selectedRole, selectedRemote, selectedMinSalary]); 

  return (
    <>
      <div className={styles.filterContainer}>
        <TextField
          id="outlined-basic"
          label="Search Company"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <TextField
          id="outlined-select-experience"
          select
          label="Select Experience"
          value={selectedExperience}
          onChange={handleExperienceChange}
          variant="outlined"
          className={styles.selectBox}
        >
          <MenuItem value="">All</MenuItem>
          {experienceLevels.map(level => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-role"
          select
          label="Select Role"
          value={selectedRole}
          onChange={handleRoleChange}
          variant="outlined"
          className={styles.selectBox}
        >
          <MenuItem value="">All</MenuItem>
          {roleOptions.map(role => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-remote"
          select
          label="Remote"
          value={selectedRemote}
          onChange={handleRemoteChange}
          variant="outlined"
          className={styles.selectBox}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>
        <TextField
          id="outlined-select-min-salary"
          select
          label="Minimum Salary"
          value={selectedMinSalary}
          onChange={handleMinSalaryChange}
          variant="outlined"
          className={styles.selectBox}
        >
          <MenuItem value="">All</MenuItem>
          {minSalaryOptions.map(salary => (
            <MenuItem key={salary} value={salary}>
              {salary}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={styles.jobCardContainer}>
        {filteredJobs.map(job => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </div>
      
    </>
  );
}

export default SearchBox;
