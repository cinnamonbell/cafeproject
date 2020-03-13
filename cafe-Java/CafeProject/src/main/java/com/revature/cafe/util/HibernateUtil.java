package com.revature.cafe.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class HibernateUtil {

	private final SessionFactory sessionFactory;
	private static HibernateUtil hibernateUtil;

	public synchronized static HibernateUtil getInstance() {
		if (hibernateUtil == null) {
			hibernateUtil = new HibernateUtil();
		}
		return hibernateUtil;
	}

	private HibernateUtil() {
                 StandardServiceRegistry registry = null;
		try {
                    // Create the SessionFactory from standard (hibernate.cfg.xml)
                    // config file.
                     registry = new StandardServiceRegistryBuilder()
                        .configure()
                        .build();

                    MetadataSources sources = new MetadataSources(registry);

                    Metadata metadata = sources.getMetadataBuilder().build();
                    sessionFactory = metadata.getSessionFactoryBuilder().build();
		} catch (Throwable ex) {
			// Log the exception.
			System.err.println("Initial SessionFactory creation failed." + ex);
                        if (registry != null) StandardServiceRegistryBuilder.destroy(registry);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public Session getSession() {
		return this.getSessionFactory().openSession();
	}

}
