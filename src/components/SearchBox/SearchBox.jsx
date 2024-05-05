import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import JobCard from '../JobCard/JobCard';
import styles from './SearchBox.module.css'
import { useDispatch } from 'react-redux';
import { incrementOffset } from '../../store/offsetSlice';

const SearchBox = ({ jobData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedRemote, setSelectedRemote] = useState('');
  const [selectedMinSalary, setSelectedMinSalary] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const [showLoadMore, setShowLoadMore] = useState(false);

  const [experienceLevels, setExperienceLevels] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [minSalaryOptions, setMinSalaryOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const dispatch = useDispatch();

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
      const uniqueLocations = [...new Set(jobData.map(job => job.location))];
      setLocationOptions(uniqueLocations.filter(location => location));

      const filtered = jobData.filter(job => {
        const matchesSearchTerm = searchTerm.trim() === '' || (job.companyName && job.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesExperience = selectedExperience === '' ||
          (job.minExp !== null && job.maxExp !== null &&
            job.minExp <= selectedExperience && job.maxExp >= selectedExperience);
        const matchesRole = selectedRole === '' || (job.jobRole && job.jobRole.toLowerCase().includes(selectedRole.toLowerCase()));
        const matchesRemote = selectedRemote === '' || (selectedRemote === 'Yes' && job.location && job.location.toLowerCase() === 'remote');
        const matchesNonRemote = selectedRemote === 'No' && (job.location && job.location.toLowerCase() !== 'remote');
        const matchesMinSalary = selectedMinSalary === '' || (job.minJdSalary !== null && job.minJdSalary >= selectedMinSalary);
        const matchesLocation = selectedLocation === '' || (job.location && job.location.toLowerCase() === selectedLocation.toLowerCase());
        return matchesSearchTerm && matchesExperience && matchesRole && (matchesRemote || matchesNonRemote) && matchesMinSalary && matchesLocation;
      });
      setFilteredJobs(filtered);
      setShowLoadMore(true);
    }
  }, [jobData, searchTerm, selectedExperience, selectedRole, selectedRemote, selectedMinSalary, selectedLocation]);

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

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleLoadMore = () => {
    dispatch(incrementOffset());
  };

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
          label="Select Work Mode"
          value={selectedRemote}
          onChange={handleRemoteChange}
          variant="outlined"
          className={styles.selectBox}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Yes">Remote</MenuItem>
          <MenuItem value="No">On Site</MenuItem>
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
        <TextField
          id="outlined-select-location"
          select
          label="Select Location"
          value={selectedLocation}
          onChange={handleLocationChange}
          variant="outlined"
          className={styles.selectBox}
        >
          <MenuItem value="">All</MenuItem>
          {locationOptions.map(location => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={styles.jobCardContainer}>
        {filteredJobs.map(job => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </div>
      {showLoadMore && (
        <div className={styles.loadMoreContainer}>
          <Button variant="contained" color="primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}

export default SearchBox;
