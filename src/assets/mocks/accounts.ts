type Data = {
  name: string;
  userId: string
  title: string
  function: string
  permissions: string
  lastLoggedIn: Date
};

export const accounts: Data[] = [
  {
    name: "Alice Johnson",
    userId: "user_001",
    title: "Manager",
    function: "Human Resources",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-19'),
  },
  {
    name: "Bob Smith",
    userId: "user_002",
    title: "Developer",
    function: "IT",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-18'),
  },
  {
    name: "Charlie Davis",
    userId: "user_003",
    title: "Analyst",
    function: "Finance",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-17'),
  },
  {
    name: "Diana Lee",
    userId: "user_004",
    title: "Director",
    function: "Operations",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-16'),
  },
  {
    name: "Ethan Turner",
    userId: "user_005",
    title: "Designer",
    function: "Marketing",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-15'),
  },
  {
    name: "Fiona Green",
    userId: "user_006",
    title: "Consultant",
    function: "Sales",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-14'),
  },
  {
    name: "George White",
    userId: "user_007",
    title: "Support Lead",
    function: "Customer Service",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-13'),
  },
  {
    name: "Helen Clark",
    userId: "user_008",
    title: "Coordinator",
    function: "Events",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-12'),
  },
  {
    name: "Isaac Wright",
    userId: "user_009",
    title: "Engineer",
    function: "Development",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-11'),
  },
  {
    name: "Jill Adams",
    userId: "user_010",
    title: "Product Manager",
    function: "Product",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-10'),
  },
  {
    name: "Kyle Miller",
    userId: "user_011",
    title: "Executive",
    function: "Leadership",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-09'),
  },
  {
    name: "Liam Thomas",
    userId: "user_012",
    title: "Researcher",
    function: "R&D",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-08'),
  },
  {
    name: "Mia Robinson",
    userId: "user_013",
    title: "Intern",
    function: "HR",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-07'),
  },
  {
    name: "Noah Walker",
    userId: "user_014",
    title: "Specialist",
    function: "Procurement",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-06'),
  },
  {
    name: "Olivia Martinez",
    userId: "user_015",
    title: "Legal Counsel",
    function: "Legal",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-05'),
  },
  {
    name: "Paul Carter",
    userId: "user_016",
    title: "IT Administrator",
    function: "Infrastructure",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-04'),
  },
  {
    name: "Quinn Harris",
    userId: "user_017",
    title: "Lead Developer",
    function: "Software",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-03'),
  },
  {
    name: "Rachel Edwards",
    userId: "user_018",
    title: "Scrum Master",
    function: "Agile",
    permissions: "user",
    lastLoggedIn: new Date('2024-10-02'),
  },
  {
    name: "Steve King",
    userId: "user_019",
    title: "Project Manager",
    function: "PMO",
    permissions: "admin",
    lastLoggedIn: new Date('2024-10-01'),
  },
  {
    name: "Tina Young",
    userId: "user_020",
    title: "Consultant",
    function: "Strategy",
    permissions: "user",
    lastLoggedIn: new Date('2024-09-30'),
  }
];
