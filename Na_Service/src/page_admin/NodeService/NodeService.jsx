export const NodeService = {
    getTreeNodesData() {
        return [
            {
                key: 'Prestations Avicoles',
                label: 'Prestations Avicoles',
                data: 'Prestations Avicoles',
                children: [
                    {
                        key: 'Ramassage de volailles',
                        label: 'Ramassage de volailles',
                        data: 'Ramassage de volailles',
                        children: [
                            { key: 'Chargement', label: 'Chargement', data: 'Chargement' },
                            { key: 'Déchargement', label: 'Déchagrgement', data: 'Déchagrgement' },
                            { key: 'Mise en place et transfert de poulettes', label: 'Mise en place et transfert de poulettes', data: 'Mise en place et transfert de poulettes' }

                        ]
                    },
                    {
                        key: 'Vaccination de Volailles',
                        label: 'Vaccination de Volailles',
                        data: 'Vaccination de Volailles',
                        children: [
                            { key: 'Vaccination (simple et double)', label: 'Vaccination (simple et double)', data: 'Vaccination (simple et double)' },
                            { key: 'Seringues de différents dosage', label: 'Seringues de différents dosage', data: 'Seringues de différents dosage' }
                        
                        ]
                    },
                    {
                        key: 'Nettoyage et Désinfection de bâtiments',
                        label: 'Nettoyage et Désinfection de bâtiments',
                        data: 'Nettoyage et Désinfection de bâtiments',
                        children: [
                            { key: 'Nettoyage', label: 'Nettoyage', data: 'Nettoyage' },
                            { key: 'Désinfection', label: 'Désinfection', data: 'Désinfection' },
                            { key: 'Dépoussiérage', label: 'Dépoussiérage', data: 'Dépoussiérage' },
                            { key: 'Hrattage', label: 'Hrattage', data: 'Hrattage' },
                            { key: 'Balayage', label: 'Balayage', data: 'Balayage' },
                            { key: 'Soufflage', label: 'Soufflage', data: 'Soufflage' }                        
                        ]
                    },
                    {
                        key: 'Dératisation Désinsectisation',
                        label: 'Dératisation Désinsectisation',
                        data: 'Dératisation Désinsectisation',
                        children: [
                            { key: 'Lutte anti-rongeur', label: 'Lutte anti-rongeur', data: 'Lutte anti-rongeur' },
                            { key: 'Lutte anti-insectes', label: 'Lutte anti-insectes', data: 'Lutte anti-insectes' },
                            { key: 'Lutte anti-bactéries, virus et champignons', label: 'Lutte anti-bactéries, virus et champignons', data: 'Lutte anti-bactéries, virus et champignons' },
                                             
                        ]
                    }
                ]
            },
            {
                key: 'Prestations Viticoles',
                label: 'Prestations Viticoles',
                data: 'Prestations Viticoles',
                children: [
                    {
                         key: 'Travaux manuels',
                         label: 'Travaux manuels',
                         data: 'Travaux manuels',
                        children: [
                            { key: 'Instalation des parcelles viticoles', label: 'Instalation des parcelles viticoles', data: 'Instalation des parcelles viticoles' },
                            { key: 'Cisaillage des plantations et entre plantation', label: 'Cisaillage des plantations et entre plantation', data: 'Cisaillage des plantations et entre plantation' },
                            { key: 'Taille des vignes1', label: 'Taille des vignes', data: 'Taille des vignes1' },
                            { key: 'Liage des bois', label: 'Liage des bois', data: 'Liage des bois' },
                            { key: 'Ebourgeonnage des vignes', label: 'Ebourgeonnage des vignes', data: 'Ebourgeonnage des vignes' },
                        ]
                     },




                    { key: 'Travaux mécaniques', label: 'Travaux mécaniques', data: 'Travaux mécaniques',

                        children: [
                            { key: 'Rognage et effeuillage mécanique des vignes', label: 'Rognage et effeuillage mécanique des vignes', data: 'Rognage et effeuillage mécanique des vignes' },
                            { key: 'Ramassage des pierres dans les parcelles', label: 'Ramassage des pierres dans les parcelles', data: 'Ramassage des pierres dans les parcelles' },
                            { key: 'Broyage des bois de taille', label: 'Broyage des bois de taille', data: 'Broyage des bois de taille' },
                            { key: 'Épandage d engrais', label: 'Épandage d engrais', data: 'Épandage d engrais' },
                            { key: 'Tontes', label: 'Tontes', data: 'Tontes' },
                        ]
                     },
                    { key: 'Taille des vignes', label: 'Taille des vignes', data: 'Taille des vignes',

                        children: [
                            { key: 'Taille des vignes description', label: 'Taille des vignes description', data: 'Taille des vignes description' },
                          
                        ]

                     },
                    { key: 'Vendanges', label: 'Vendanges', data: 'Vendanges',
                        children: [
                            { key: 'Effeuillage', label: 'Effeuillage', data: 'Effeuillage' },
                            { key: 'Cueillette', label: 'Cueillette', data: 'Cueillette' },
                            { key: 'Cueillette et débardage', label: 'Cueillette et débardage', data: 'Cueillette et débardage' },
                            { key: 'Livraison à un centre de pressurage', label: 'Livraison à un centre de pressurage', data: 'Livraison à un centre de pressurage' },
                            { key: 'Fourniture de caisses', label: 'Fourniture de caisses', data: 'Fourniture de caisses' },
                        ]

                     }

                ]
            },
           
        ];
    },

    getTreeTableNodesData() {
        return [
            {
                key: '0',
                data: {
                    name: 'Applications',
                    size: '100kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '0-0',
                        data: {
                            name: 'React',
                            size: '25kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '0-0-0',
                                data: {
                                    name: 'react.app',
                                    size: '10kb',
                                    type: 'Application'
                                }
                            },
                            {
                                key: '0-0-1',
                                data: {
                                    name: 'native.app',
                                    size: '10kb',
                                    type: 'Application'
                                }
                            },
                            {
                                key: '0-0-2',
                                data: {
                                    name: 'mobile.app',
                                    size: '5kb',
                                    type: 'Application'
                                }
                            }
                        ]
                    },
                    {
                        key: '0-1',
                        data: {
                            name: 'editor.app',
                            size: '25kb',
                            type: 'Application'
                        }
                    },
                    {
                        key: '0-2',
                        data: {
                            name: 'settings.app',
                            size: '50kb',
                            type: 'Application'
                        }
                    }
                ]
            },
            {
                key: '1',
                data: {
                    name: 'Cloud',
                    size: '20kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '1-0',
                        data: {
                            name: 'backup-1.zip',
                            size: '10kb',
                            type: 'Zip'
                        }
                    },
                    {
                        key: '1-1',
                        data: {
                            name: 'backup-2.zip',
                            size: '10kb',
                            type: 'Zip'
                        }
                    }
                ]
            },
            {
                key: '2',
                data: {
                    name: 'Desktop',
                    size: '150kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '2-0',
                        data: {
                            name: 'note-meeting.txt',
                            size: '50kb',
                            type: 'Text'
                        }
                    },
                    {
                        key: '2-1',
                        data: {
                            name: 'note-todo.txt',
                            size: '100kb',
                            type: 'Text'
                        }
                    }
                ]
            },
            {
                key: '3',
                data: {
                    name: 'Documents',
                    size: '75kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '3-0',
                        data: {
                            name: 'Work',
                            size: '55kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '3-0-0',
                                data: {
                                    name: 'Expenses.doc',
                                    size: '30kb',
                                    type: 'Document'
                                }
                            },
                            {
                                key: '3-0-1',
                                data: {
                                    name: 'Resume.doc',
                                    size: '25kb',
                                    type: 'Resume'
                                }
                            }
                        ]
                    },
                    {
                        key: '3-1',
                        data: {
                            name: 'Home',
                            size: '20kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '3-1-0',
                                data: {
                                    name: 'Invoices',
                                    size: '20kb',
                                    type: 'Text'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                key: '4',
                data: {
                    name: 'Downloads',
                    size: '25kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '4-0',
                        data: {
                            name: 'Spanish',
                            size: '10kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '4-0-0',
                                data: {
                                    name: 'tutorial-a1.txt',
                                    size: '5kb',
                                    type: 'Text'
                                }
                            },
                            {
                                key: '4-0-1',
                                data: {
                                    name: 'tutorial-a2.txt',
                                    size: '5kb',
                                    type: 'Text'
                                }
                            }
                        ]
                    },
                    {
                        key: '4-1',
                        data: {
                            name: 'Travel',
                            size: '15kb',
                            type: 'Text'
                        },
                        children: [
                            {
                                key: '4-1-0',
                                data: {
                                    name: 'Hotel.pdf',
                                    size: '10kb',
                                    type: 'PDF'
                                }
                            },
                            {
                                key: '4-1-1',
                                data: {
                                    name: 'Flight.pdf',
                                    size: '5kb',
                                    type: 'PDF'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                key: '5',
                data: {
                    name: 'Main',
                    size: '50kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '5-0',
                        data: {
                            name: 'bin',
                            size: '50kb',
                            type: 'Link'
                        }
                    },
                    {
                        key: '5-1',
                        data: {
                            name: 'etc',
                            size: '100kb',
                            type: 'Link'
                        }
                    },
                    {
                        key: '5-2',
                        data: {
                            name: 'var',
                            size: '100kb',
                            type: 'Link'
                        }
                    }
                ]
            },
            {
                key: '6',
                data: {
                    name: 'Other',
                    size: '5kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '6-0',
                        data: {
                            name: 'todo.txt',
                            size: '3kb',
                            type: 'Text'
                        }
                    },
                    {
                        key: '6-1',
                        data: {
                            name: 'logo.png',
                            size: '2kb',
                            type: 'Picture'
                        }
                    }
                ]
            },
            {
                key: '7',
                data: {
                    name: 'Pictures',
                    size: '150kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '7-0',
                        data: {
                            name: 'barcelona.jpg',
                            size: '90kb',
                            type: 'Picture'
                        }
                    },
                    {
                        key: '7-1',
                        data: {
                            name: 'primeng.png',
                            size: '30kb',
                            type: 'Picture'
                        }
                    },
                    {
                        key: '7-2',
                        data: {
                            name: 'prime.jpg',
                            size: '30kb',
                            type: 'Picture'
                        }
                    }
                ]
            },
            {
                key: '8',
                data: {
                    name: 'Videos',
                    size: '1500kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '8-0',
                        data: {
                            name: 'primefaces.mkv',
                            size: '1000kb',
                            type: 'Video'
                        }
                    },
                    {
                        key: '8-1',
                        data: {
                            name: 'intro.avi',
                            size: '500kb',
                            type: 'Video'
                        }
                    }
                ]
            }
        ];
    },

    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};
