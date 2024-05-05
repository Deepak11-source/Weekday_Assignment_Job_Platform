import React, { useState, useRef, useEffect } from 'react';
import styles from './JobCard.module.css'

const JobCard = ({ job }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (containerRef.current && contentRef.current) {
            const containerHeight = containerRef.current.offsetHeight;
            const detailsHeight = contentRef.current.offsetHeight;

            if (detailsHeight > containerHeight) {
                setShowMore(true);
            }
        }
    }, []);
    
    const handleApplyClick = () => {
        window.open(job.jdLink, '_blank');
    };

    return (
        <div className={styles.card}>
            <div className={styles.postedDate}>⏳ Posted 13 days ago</div>

            <div className={styles.companyInfo}>
                <div className={styles.logo}>
                <img src={job.logoUrl} alt={job.companyName} />
                </div>
                <div className={styles.info}>
                    <div className={styles.companyName}>{job.companyName}</div>
                    <div className={styles.position}>
                        {job.jobRole
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                    </div>
                    <div className={styles.location}>{job.location.charAt(0).toUpperCase() + job.location.slice(1)}</div>
                </div>
            </div>

            <div className={styles.salary}>Estimated Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode} ✅</div>

            <div ref={containerRef} className={styles.company} style={{ maxHeight: isExpanded ? 'none' : '200px', overflow: isExpanded ? 'visible' : 'hidden', position: 'relative' }}>
                <p className={styles.title}>About Company:</p>
                <p className={styles.subTitle}>About us</p>
                <div ref={contentRef} className={styles.details}>
                    {job.jobDetailsFromCompany}
                </div>
                {showMore &&
                    <button className={styles.viewMoreBtn} onClick={toggleExpansion}>
                        {isExpanded ? 'View Less' : 'View Job'}
                    </button>
                }
                {showMore && (
                    <div className={styles.fadeEffect} />
                )}
            </div>

            <div className={styles.exp}>
                <div className={styles.label}>Minimum Experience</div>
                <div>{job.minExp} - {job.maxExp} years</div>
            </div>

            <div className={styles.action}>
                <button className={styles.applyBtn} onClick={handleApplyClick}>⚡Easy Apply</button> <br />
                <button className={styles.referBtn}>🧑‍💼 🧑‍💼 Unlock referral asks</button>
            </div>
        </div>
    )
}

export default JobCard