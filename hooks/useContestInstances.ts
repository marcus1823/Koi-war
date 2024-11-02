import { API_BASE_URL } from '@/api/api';
import { ContestInstance } from '@/models/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useContestInstances = (contestId: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [instances, setInstances] = useState<ContestInstance[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch Instances API
    const fetchInstances = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/contest/${contestId}/instances`);
            setInstances(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch instances');
            console.error('Error fetching instances:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create Instance API
    const createInstance = async (instanceData: Omit<ContestInstance, 'id'>) => {
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/contest/${contestId}/instances`, instanceData);
            await fetchInstances(); // Refresh instances after creation
        } catch (err) {
            setError('Failed to create instance');
            console.error('Error creating instance:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle Status API
    const toggleStatus = async (id: string, isActive: boolean) => {
        setIsLoading(true);
        try {
            await axios.patch(`${API_BASE_URL}/contest/instance/${id}/status`, { isActive });
            await fetchInstances(); // Refresh instances after toggling status
        } catch (err) {
            setError('Failed to toggle status');
            console.error('Error toggling status:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch of instances
    useEffect(() => {
        fetchInstances();
    }, [contestId]);

    // Return all necessary states and functions
    return {
        instances,
        isLoading,
        error,
        createInstance,
        toggleStatus,
        refetch: fetchInstances, // Allow manual refetching if needed
    };
};
