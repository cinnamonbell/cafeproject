package com.revature.cafe.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;


public class HibernateUtil {

    private final SessionFactory sessionFactory;
    private static HibernateUtil hibernateUtil;
    
    public synchronized static HibernateUtil getInstance(){
        if (hibernateUtil == null){
            hibernateUtil = new HibernateUtil();
        }
        return hibernateUtil;
    }
    
    private HibernateUtil(){
                try {
            // Create the SessionFactory from standard (hibernate.cfg.xml) 
            // config file.
                StandardServiceRegistry standardRegistry = new StandardServiceRegistryBuilder().configure().build();
                Metadata meta = new MetadataSources(standardRegistry)
                         .getMetadataBuilder()
                         .applyImplicitNamingStrategy(ImplicitNamingStrategyJpaCompliantImpl.INSTANCE)
                         .build();
                sessionFactory = meta.getSessionFactoryBuilder()
                        .build();
        } catch (Throwable ex) {
            // Log the exception. 
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }
    
    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
	public Session getSession()
	{
		return this.getSessionFactory().openSession();
	}

}
