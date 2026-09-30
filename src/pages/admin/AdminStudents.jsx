import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Mail,
  GraduationCap,
  Building,
  Award,
  BookOpen,
  Calendar,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminStudents = () => {
  const { allStudents, allProfiles } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return allStudents.filter(student => {
      const q = searchQuery.toLowerCase().trim();
      const profile = allProfiles[student.id] || {};
      return !q ||
        student.name.toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q) ||
        (student.branch && student.branch.toLowerCase().includes(q)) ||
        (student.college && student.college.toLowerCase().includes(q));
    });
  }, [allStudents, allProfiles, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Registered Students Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor registered student profiles, eligibility parameters, and academic details
          </p>
        </div>

        <Badge variant="indigo" size="md">
          {allStudents.length} Active Candidates
        </Badge>
      </div>

      {/* Search Bar */}
      <Card noPadding>
        <div className="p-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </div>
      </Card>

      {/* Students Table / Grid */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No students found"
          description="No student profiles match your search criteria."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">College & Department</th>
                  <th className="px-6 py-4">Academic Year</th>
                  <th className="px-6 py-4">Registered On</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(student => {
                  const studentProfile = allProfiles[student.id] || {};

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                            alt={student.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{student.name}</span>
                            <span className="text-[11px] text-slate-500">{student.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800 block">{student.branch || 'Engineering'}</span>
                        <span className="text-[11px] text-slate-500">{student.college || 'NIT'}</span>
                      </td>

                      <td className="px-6 py-4">
                        <Badge variant="indigo" size="sm">
                          {student.year || 'Final Year'}
                        </Badge>
                        {studentProfile.cgpa && (
                          <span className="block text-[11px] font-bold text-emerald-700 mt-1">
                            CGPA: {studentProfile.cgpa}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'Active'}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Eye}
                          onClick={() => setSelectedStudent({ ...student, profile: studentProfile })}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={selectedStudent.name}
          subtitle={`Student Candidate • ${selectedStudent.email}`}
          maxWidth="max-w-xl"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={selectedStudent.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent.name}`}
                alt={selectedStudent.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedStudent.name}</h4>
                <p className="text-slate-500">{selectedStudent.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="indigo">{selectedStudent.branch}</Badge>
                  <Badge variant="emerald">{selectedStudent.year}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">College</span>
                <span className="font-semibold text-slate-800">{selectedStudent.college}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">CGPA Benchmark</span>
                <span className="font-bold text-indigo-700 text-sm">{selectedStudent.profile?.cgpa || '8.85 / 10'}</span>
              </div>
            </div>

            {selectedStudent.profile?.bio && (
              <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-bold text-[10px] uppercase mb-1">Student Bio</span>
                <p className="text-slate-600 leading-relaxed">{selectedStudent.profile.bio}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

    </div>
  );
};
