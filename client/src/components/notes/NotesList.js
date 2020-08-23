import React, { useState, useEffect } from 'react';

import { fetchAllNotes } from './../../services/NotesServices'

const NotesList = () => {

    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState({});

    const getNotes = () => {
        setLoading(true);

        fetchAllNotes(({ notes }) => {
            console.log('notes', notes);

            setNotes(notes);

            setLoading(false);
        }, (error) => {
            console.log('erroooor', error);
            alert('Error in fetching requests');
            
        });
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row mb-4">
                    <div className="mr-4 mb-3 mb-sm-0">
                        <h1 className="mb-0">Dashboard</h1>
                        <div className="small">
                            <span className="font-weight-500 text-primary">Sunday</span> &middot;
                                August 16, 2020 &middot; 07:39 am
                            </div>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-header">Notes</div>
                    <div className="card-body">
                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { !loading && notes.map((note, index) => (
                                    <tr>
                                        <td>{note.title}</td>
                                        <td>{note.created_at}</td>
                                        <td>{note.updated_at}</td>
                                        <td>test</td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NotesList;